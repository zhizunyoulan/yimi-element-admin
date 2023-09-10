import { deptTreeQuery } from "@/api/system/dept";
import { OptionsMaker, findTargetRecursively } from "@/utils/index";

const state = {
    depts: []
}

const getters = {
    depts: state => state.depts,
    getDeptById: (state) => (id) => {
        return findTargetRecursively({
            children: state.depts
        },'children', 'id', id)
    },
    getDeptNameById: (state, getters) => (id) => {
        let dept = getters.getDeptById(id)
        console.log('dept:', dept)
        return dept?.name
    }
}
const mutations = {
    setDepts: (state, depts) => {
        // console.info('=== set all tax types')
        state.depts = depts
    },
}





const actions = {
    initBaseInfos({ commit }) {
        deptTreeQuery().then(res => {
            // new OptionsMaker('id', 'name').make(res?.data?.rows)
            let depts = new OptionsMaker('id', 'name').make(res?.data?.rows, { r: true })

            if (depts)
                commit('setDepts', depts)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}