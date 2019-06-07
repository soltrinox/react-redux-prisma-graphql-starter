import userMutations from './User/mutations'
import settingMutations from './Setting/mutations'

export default {
  ...userMutations,
  ...settingMutations
}
