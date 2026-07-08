import { writable, readonly } from 'svelte/store'
import { OASISClient } from '@oasisomniverse/web4-api'

export interface OasisSession {
  avatarId: string
  username: string
  karma: number
}

const SESSION_KEY = 'oasis_jla_session'
const API_URL = 'https://api.web4.oasisomniverse.one'

function loadSession(): OasisSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const _session = writable<OasisSession | null>(loadSession())
const _karmaToast = writable<{ message: string; amount: number } | null>(null)

export const session = readonly(_session)
export const karmaToast = readonly(_karmaToast)

export async function login(username: string, password: string): Promise<void> {
  const oasis = new OASISClient({ baseUrl: API_URL })
  const result: any = await oasis.auth.login({ username, password })
  const karma: any = await oasis.karma.getKarmaForAvatar({ avatarId: result.avatarId })
  const sess: OasisSession = { avatarId: result.avatarId, username, karma: karma.total ?? 0 }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sess))
  _session.set(sess)
}

export async function register(firstName: string, lastName: string, username: string, email: string, password: string): Promise<void> {
  const oasis = new OASISClient({ baseUrl: API_URL })
  await (oasis.auth as any).register({ firstName, lastName, username, email, password })
}

export async function forgotPassword(email: string): Promise<void> {
  const oasis = new OASISClient({ baseUrl: API_URL })
  await (oasis.auth as any).forgotPassword({ email })
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY)
  _session.set(null)
}

export async function addKarma(amount: number, reason: string): Promise<void> {
  let current: OasisSession | null = null
  _session.subscribe(s => { current = s })()
  if (!current) return
  try {
    const oasis = new OASISClient({ baseUrl: API_URL })
    await oasis.karma.addKarmaToAvatar({ avatarId: (current as OasisSession).avatarId, karmaAmount: amount, karmaSourceTitle: reason })
    const updated = { ...(current as OasisSession), karma: (current as OasisSession).karma + amount }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated))
    _session.set(updated)
    _karmaToast.set({ message: reason, amount })
    setTimeout(() => _karmaToast.set(null), 4000)
  } catch { /* silent */ }
}
