<template>
    <div id="contain">
        <projectHead></projectHead>
    </div>

</template>

<script>
    import projectHead from '../project/projectHeader.vue';

    export default {
        data() {
            return {}
        },
        components: {
            projectHead
        }
    }
</script>

<style scoped lang="scss">
.contain{
    overflow: auto;
}

</style>