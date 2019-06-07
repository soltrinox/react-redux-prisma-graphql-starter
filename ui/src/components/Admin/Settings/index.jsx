import React from 'react'
import {useStore} from 'easy-peasy'
import SettingsForm from './Form'

export default function SettingsWrapper() {
  const {listAsObject, error, loading} = useStore(store => store.settings)

  return <SettingsForm initialValues={listAsObject} />
}
