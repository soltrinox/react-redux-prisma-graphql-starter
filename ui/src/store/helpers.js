import {original} from 'immer'

function log(item) {
  console.log(original(item))
}

export {log}
