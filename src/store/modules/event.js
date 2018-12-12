import EventService from '@/services/EventService.js'

const namespaced = true

const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(resp => {
        commit('SET_EVENTS', resp.data)
        commit('SET_EVENTS_TOTAL', resp.headers['x-total-count'])
      })
      .catch(err => {
        console.log(err)
      })
  },
  fetchEvent({ commit, getters }, id) {
    let event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(resp => {
          commit('SET_EVENT', resp.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}

const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
