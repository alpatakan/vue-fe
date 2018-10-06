<template>
  <div class="container">
    <div id="navbar-container">
      <tabs>
        <tab name="Dashboard" :selected="true">
        <dashboard/>
        </tab>
        <tab name="Formlar">
          <forms/>
        </tab>
        <tab name="Kisiler">
          <people/>
        </tab>
        <tab name="Rapor Sablonu">
          <reportTemplate/>
        </tab>
        <tab name="Oturumlar">
          <sessions/>
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
  import Tabs from '@/components/navigation-bar/Tabs'
  import Tab from '@/components/navigation-bar/Tab'
  import Dashboard from '@/components/Dashboard'
  import Forms from '@/components/Forms'
  import People from '@/components/People'
  import ReportTemplate from '@/components/ReportTemplate'
  import Sessions from '@/components/Sessions'

  export default {
    components: {
      Tabs,
      Tab,
      Dashboard,
      Forms,
      People,
      ReportTemplate,
      Sessions,
    }
  }

</script>
