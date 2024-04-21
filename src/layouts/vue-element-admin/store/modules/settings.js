import variables from '@/layouts/vue-element-admin/styles/element-variables.scss'
import defaultSettings from '@/layouts/vue-element-admin/settings'
import axios from "axios";

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    configuration: ''
}
const getters = {
    GET_CONFIGURATION: state => {
        return state.configuration ? JSON.parse(state.configuration) : ''
    },
}
const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    },
    SET_CONFIGURATION(state, payload) {
        state.configuration = JSON.stringify(payload)
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
    async ASC_SET_CONFIGURATION({ commit }) {
        try {
            let { data, status } = await axios.get(
                "/systemlayout/system/getconfiguration"
            );
            if (status === 200 && (data ?? "" !== "")) {
                commit('SET_CONFIGURATION', data);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}