import { useDispatch, useSelector } from 'react-redux';     // Importing hooks from react-redux
import type { RootState, AppDispatch } from './index';      // Importing types from the store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Typed version of useDispatch hook for dispatching actions with AppDispatch type
export const useAppSelector = useSelector.withTypes<RootState>();   // Typed version of useSelector hook for selecting state with RootState type