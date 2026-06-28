import { useState, useCallback } from 'react'
import { loadState, saveState, getClients, getHistory, getSettings } from '../lib/storage'

export function useStore() {
  const [clients, setClientsState] = useState(getClients)
  const [history, setHistoryState] = useState(getHistory)
  const [settings, setSettingsState] = useState(getSettings)

  const setClients = useCallback(v => { saveState({ clients: v }); setClientsState(v) }, [])
  const setHistory = useCallback(v => { saveState({ history: v }); setHistoryState(v) }, [])
  const setSettings = useCallback(v => { saveState({ settings: v }); setSettingsState(v) }, [])

  return { clients, setClients, history, setHistory, settings, setSettings }
}
