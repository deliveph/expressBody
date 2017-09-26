import store from '../../store'

export function onRobots (robots) {
  store.commit('updateRobots', robots)
}
