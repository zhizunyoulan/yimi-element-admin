export default {
    state: {
        fullscreenLoading: true, //设置loading是否显示
        neddloding: 0 //根据是否为0来判断是否关闭loading
    },
    mutations: {
        gbfullscreenLoading(state) {
            console.log('触发')
            state.fullscreenLoading = true; //loading显示
        },
        gbfullscreenLoadinga(state) {
            state.fullscreenLoading = false; //loading关闭
        },
        show(state) { //每请求一次加一
            state.neddloding++
        },
        hide(state) { //每完成请求一次减一
            state.neddloding--
                // state.neddloding = 0
        }
    },
};