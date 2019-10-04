<template>
    <div class="sk-three-bounce" id="sk-three-bounce" ref="load">
        <div class="sk-child sk-bounce1"></div>
        <div class="sk-child sk-bounce2"></div>
        <div class="sk-child sk-bounce3"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .sk-three-bounce {
        /*使用弹性布局让加载动画持续会于页面中央，不随滚动条变化*/
        /* position: fixed;
         top: 50%;
         left: 50%;*/
        display: flex;
        justify-content: center;

    }

    .sk-three-bounce .sk-child {
        /*在这里设置加载球的大小*/
        width: 10px;
        height: 10px;
        /*加载求的颜色在这里修改*/
        background-color: #22d7bb;;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
        animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
    }

    .sk-three-bounce .sk-bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
        margin: 0 3px;
    }

    .sk-three-bounce .sk-bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
        margin: 0 3px;
    }

    .sk-three-bounce .sk-bounce3 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
        margin: 0 3px;
    }

    @-webkit-keyframes sk-three-bounce {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        40% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes sk-three-bounce {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        40% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

</style>