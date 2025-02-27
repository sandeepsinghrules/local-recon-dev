<template>

  <panel-navigation>
      <admin-dashboard v-if="me && me.company_type == 'admin'" />
      <agency-dashboard v-if="me && me.company_type == 'agency'" />
      <business-dashboard v-if="me && (me.company_type == 'business' || me.company_type == 'location')" />
  </panel-navigation>

</template>

<script>
    import { mapState } from 'vuex'
    import AdminDashboard from '@/views/panel/Dashboard/Admin.vue'
    import AgencyDashboard from '@/views/panel/Dashboard/Agency.vue'
    import BusinessDashboard from '@/views/panel/Dashboard/Business.vue'
    import PanelNavigation from '@/components/PanelNavigation.vue'

    export default {
    metaInfo () {
        return {
        title: "Dashboard | " + this.$appName
        }
    },
    components: {
        PanelNavigation,
        AdminDashboard,
        AgencyDashboard,
        BusinessDashboard
    },
    computed: {
        ...mapState({
        me: state => state.me.me
        })
    },
    }
</script>

<style type="text/css">
    .theme--light.v-sheet--outlined {
        border: thin solid rgba(0, 0, 0, 0.12);
    }
</style>