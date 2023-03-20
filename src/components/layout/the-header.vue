<template>
  <header>
    <github-link />
  </header>
</template>

<script>
import { GITHUB_LINK } from '@/constants';

import GithubLink from '@/components/common/links/github-link.vue';

export default {
  components: { GithubLink },
  computed: {
    githubLink() {
      return GITHUB_LINK;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex-end;
}
</style>
