import lastUpdated from '../../version'

function loadWindowObject() {
  window.$ctfp = {
    info: () => {
      return {lastUpdated}
    }
  }
}

export default loadWindowObject
