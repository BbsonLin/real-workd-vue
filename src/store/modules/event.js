import EventService from '@/services/EventService.js'

const namespaced = true

const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3
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
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        let notification = {
          type: 'success',
          message: `Your event has been created.`
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(err => {
        let notification = {
          type: 'error',
          message: `There was as problem creating your event: ${err.message}`
        }
        dispatch('notification/add', notification, { root: true })
        throw err
      })
  },
  fetchEvents({ commit, dispatch, state }, page) {
    return EventService.getEvents(state.perPage, page)
      .then(resp => {
        commit('SET_EVENTS', resp.data)
        commit('SET_EVENTS_TOTAL', resp.headers['x-total-count'])
      })
      .catch(err => {
        let notification = {
          type: 'error',
          message: `There was as problem fetching events: ${err.message}`
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters }, id) {
    let event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then(resp => {
          commit('SET_EVENT', resp.data)
          return resp.data
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
