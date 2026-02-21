/**
 * Firestore CRUD for quiet-time sessions.
 */
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Session } from '../types';

const SESSIONS = 'sessions';

function toSession(id: string, data: Record<string, unknown>): Session {
  return {
    id,
    userId: (data.userId as string) ?? '',
    date: (data.date as string) ?? '',
    duration: (data.duration as number) ?? 0,
    bibleReference: (data.bibleReference as string) ?? '',
    qualities: (data.qualities as string[]) ?? [],
    undertakings: (data.undertakings as string[]) ?? [],
    actions: (data.actions as string[]) ?? [],
    points: data.points as Session['points'],
    createdAt: (data.createdAt as Timestamp)?.toDate?.()?.toISOString?.() ?? (data.createdAt as string),
    updatedAt: (data.updatedAt as Timestamp)?.toDate?.()?.toISOString?.() ?? (data.updatedAt as string),
  };
}

export async function createSession(
  userId: string,
  data: Omit<Session, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<Session> {
  const now = new Date().toISOString();
  const payload = {
    userId,
    date: data.date,
    duration: data.duration,
    bibleReference: data.bibleReference,
    qualities: data.qualities ?? [],
    undertakings: data.undertakings ?? [],
    actions: data.actions ?? [],
    points: data.points ?? {},
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  
  console.log('[createSession] Starting addDoc with payload:', JSON.stringify(payload));
  console.log('[createSession] DB instance:', db);
  console.log('[createSession] Collection path:', SESSIONS);
  
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => {
      console.log('[createSession] TIMEOUT - addDoc did not complete in 10s');
      reject(new Error('Firestore write timeout after 10s'));
    }, 10000)
  );
  
  const ref = await Promise.race([
    addDoc(collection(db, SESSIONS), payload).then(r => {
      console.log('[createSession] addDoc SUCCESS, ref.id:', r.id);
      return r;
    }),
    timeoutPromise
  ]) as any;
  
  console.log('[createSession] Returning session with ID:', ref.id);
  return toSession(ref.id, { ...payload, createdAt: now, updatedAt: now });
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const ref = doc(db, SESSIONS, sessionId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return toSession(snap.id, snap.data());
}

export async function getSessionsByUser(
  userId: string,
  options?: { fromDate?: string; toDate?: string; max?: number }
): Promise<Session[]> {
  const q = query(
    collection(db, SESSIONS),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(options?.max ?? 500)
  );
  const snap = await getDocs(q);
  let list = snap.docs.map((d) => toSession(d.id, d.data()));
  if (options?.fromDate) list = list.filter((s) => s.date >= options.fromDate!);
  if (options?.toDate) list = list.filter((s) => s.date <= options.toDate!);
  return list;
}

export async function updateSession(
  sessionId: string,
  updates: Partial<Pick<Session, 'duration' | 'bibleReference' | 'qualities' | 'undertakings' | 'actions' | 'points'>>
): Promise<void> {
  const ref = doc(db, SESSIONS, sessionId);
  await updateDoc(ref, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteSession(sessionId: string): Promise<void> {
  await deleteDoc(doc(db, SESSIONS, sessionId));
}

/**
 * Get sessions for heatmap: all sessions in a date range, keyed by date.
 * Assumption: heatmap shows last N months; extend with actual range as needed.
 */
export async function getSessionsForHeatmap(
  userId: string,
  fromDate: string,
  toDate: string
): Promise<Record<string, Session[]>> {
  const sessions = await getSessionsByUser(userId, { fromDate, toDate });
  const byDate: Record<string, Session[]> = {};
  for (const s of sessions) {
    if (!byDate[s.date]) byDate[s.date] = [];
    byDate[s.date].push(s);
  }
  return byDate;
}
