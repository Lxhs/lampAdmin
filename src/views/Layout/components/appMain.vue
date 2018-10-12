<template>
    <div>
        <search-b></search-b>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import searchB from "../../../components/search"
export default {
    name: "appMain",
    components: {
        searchB
    }
}
</script>

<style scoped>

</style>

