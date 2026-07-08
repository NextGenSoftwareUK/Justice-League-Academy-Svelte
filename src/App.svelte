<script lang="ts">
  import StarField from './lib/oasis/StarField.svelte'
  import NavBar from './lib/oasis/NavBar.svelte'
  import KarmaToast from './lib/oasis/KarmaToast.svelte'
  import HeroSection from './sections/Hero/HeroSection.svelte'
  import DisciplinesSection from './sections/Disciplines/DisciplinesSection.svelte'
  import CoursesSection from './sections/Courses/CoursesSection.svelte'
  import ForumSection from './sections/Forum/ForumSection.svelte'
  import FooterSection from './sections/Footer/FooterSection.svelte'
</script>

<StarField />
<NavBar />
<main class="main-content">
  <HeroSection />
  <DisciplinesSection />
  <CoursesSection />
  <ForumSection />
  <FooterSection />
</main>
<KarmaToast />

<style>
  .main-content { position: relative; z-index: 1; }
</style>
