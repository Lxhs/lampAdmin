<template>
    <div>
        <search-b></search-b>
        <router-view/>
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

