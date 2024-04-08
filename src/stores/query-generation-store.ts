import { create } from 'zustand'
import {Field} from '../types/index'


interface FieldStore{
  fields: Array<Field>,
  setFields: (updatedFields: Array<Field>) => void
}

export const useFieldsStore =  create<FieldStore>((set) => ({
  fields: [
    { label: null, keywords: null, logical_operator: null },
  ],
  setFields: (updatedFields) => set(() => ({fields : updatedFields })),
}))

