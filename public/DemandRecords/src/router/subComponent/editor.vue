<template>
    <div class='tinymce'>
        <Editor id='tinymce' v-model='tinymceHtml' :init='init'></Editor>
    </div>
</template>
<style scoped lang="scss">
    /deep/ .tox-tinymce {
        height: 300px !important;
    }

    /deep/ .tox-statusbar {
        display: none !important;
    }
</style>
<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/silver/theme'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'

    export default {
        data() {
            return {
                tinymceHtml: "请输入文本",
                init: {
                    language_url: '/static/tinymce/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/static/tinymce/skins/ui/oxide',
                    height: 1300,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    toolbar:
                        'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    branding: false
                }
            }
        },
        mounted() {
            tinymce.init({})
        },
        watch: {
            'tinymceHtml': function (newDesc) {
                this.$emit('getDesc', newDesc);
            }
        },
        components: {Editor}
    }
</script>
