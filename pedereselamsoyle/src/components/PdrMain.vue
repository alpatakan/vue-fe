<template>
  <div class="container">
    <div id="navbar-container">
      <tabs>
        <tab name="Tab One" :selected="true">
          <h1>Composer is great</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus quae repellendus vel! Accusamus aliquid,
            consequuntur culpa cumque esse ex fugiat impedit inventore laudantium maiores molestiae officia provident quod
            totam veniam!</p>
        </tab>
        <tab name="Tab Taylor Otwell">
          <h1>Vagrant is awesome</h1>
          <p>A animi, delectus deleniti dignissimos dolorum ea eveniet hic, impedit, magnam odio tempore ut. Assumenda
            blanditiis dolorem doloremque eos, id magni maxime necessitatibus odio porro ratione repudiandae tempore
            voluptate voluptatibus.</p>
        </tab>
        <tab name="Laravel and Vuejs">
          <h1>Docker is way better</h1>
          <p>Animi fuga in inventore quibusdam sed sint. Ab alias, aliquid at aut commodi culpa ea eligendi ex ipsam
            libero minus nam nobis numquam obcaecati placeat praesentium quis quod tempore voluptatum?</p>
        </tab>
        <tab name="Optimus Prime">
          <h1>What is Node.js</h1>
          <p>Accusamus cupiditate dolor doloribus illo ipsam itaque laborum, maxime natus numquam odit officiis possimus
            quidem voluptatem! Atque dignissimos labore modi nobis quasi quo sit! Aspernatur ea perspiciatis repellendus
            reprehenderit. Laboriosam?</p>
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
  import Tabs from '@/components/navigation-bar/Tabs'
  import Tab from '@/components/navigation-bar/Tab'

  export default {
    components: {
      Tabs,
      Tab
    }
  }

</script>
