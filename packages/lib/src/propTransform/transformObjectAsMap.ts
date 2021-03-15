import {
  MaybeOptionalModelProp,
  OnlyPrimitives,
  OptionalModelProp,
  prop,
} from "../modelShared/prop"
import type { AnyType, TypeToData } from "../typeChecking/schemas"
import { tProp } from "../typeChecking/tProp"
import { isMap, isObject } from "../utils"
import { asMap, mapToObject } from "../wrappers/asMap"
import { PropTransform, transformedProp } from "./propTransform"

const objectAsMapInnerTransform: PropTransform<
  Record<string, any> | unknown,
  Map<string, any> | unknown
> = {
  propToData(objectOrMap) {
    return isObject(objectOrMap) ? asMap(objectOrMap as any) : objectOrMap
  },
  dataToProp(mapOrObject) {
    return isMap(mapOrObject) ? mapToObject(mapOrObject) : mapOrObject
  },
}

/**
 * Transforms maps into objects.
 */
export type TransformMapToObject<T> =
  | (T extends Map<string, infer I> ? Record<string, I> : never)
  | Exclude<T, Map<string, any>>

/**
 * Transforms objects into maps.
 */
export type TransformObjectToMap<T> =
  | (T extends Record<string, infer I> ? Map<string, I> : never)
  | Exclude<T, Record<string, any>>

export function prop_mapObject<TValue>(): MaybeOptionalModelProp<
  TransformMapToObject<TValue>,
  TValue
>

export function prop_mapObject<TValue>(
  defaultFn: () => TValue
): OptionalModelProp<TransformMapToObject<TValue>, TValue>

export function prop_mapObject<TValue>(
  defaultValue: OnlyPrimitives<TValue>
): OptionalModelProp<TransformMapToObject<TValue>, TValue>

export function prop_mapObject(def?: any) {
  return transformedProp(
    arguments.length >= 1 ? prop(def) : prop(),
    objectAsMapInnerTransform,
    true
  )
}

export function tProp_mapObject<TType extends AnyType>(
  type: TType
): MaybeOptionalModelProp<TypeToData<TType>, TransformObjectToMap<TypeToData<TType>>>

export function tProp_mapObject<TType extends AnyType>(
  type: TType,
  defaultFn: () => TransformObjectToMap<TypeToData<TType>>
): OptionalModelProp<TypeToData<TType>, TransformObjectToMap<TypeToData<TType>>>

export function tProp_mapObject<TType extends AnyType>(
  type: TType,
  defaultValue: OnlyPrimitives<TransformObjectToMap<TypeToData<TType>>>
): OptionalModelProp<TypeToData<TType>, TransformObjectToMap<TypeToData<TType>>>

export function tProp_mapObject(typeOrDefaultValue: any, def?: any) {
  return transformedProp(
    arguments.length >= 2 ? tProp(typeOrDefaultValue, def) : tProp(typeOrDefaultValue),
    objectAsMapInnerTransform,
    true
  )
}
