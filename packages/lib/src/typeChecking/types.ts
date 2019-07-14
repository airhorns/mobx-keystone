import { typesArray } from "./array"
import { typesMaybe, typesMaybeNull } from "./maybe"
import { typesModel, typesTypedModel } from "./model"
import { typesFrozen, typesObject } from "./object"
import { typesObjectMap } from "./objectMap"
import { typesOr } from "./or"
import {
  typesBoolean,
  typesLiteral,
  typesNull,
  typesNumber,
  typesString,
  typesUndefined,
} from "./primitives"
import { typesRef } from "./ref"
import { typesUnchecked } from "./unchecked"

export const types = {
  literal: typesLiteral,
  undefined: typesUndefined,
  null: typesNull,
  boolean: typesBoolean,
  number: typesNumber,
  string: typesString,
  or: typesOr,
  maybe: typesMaybe,
  maybeNull: typesMaybeNull,
  array: typesArray,
  objectMap: typesObjectMap,
  unchecked: typesUnchecked,
  typedModel: typesTypedModel,
  model: typesModel,
  object: typesObject,
  ref: typesRef,
  frozen: typesFrozen,
}