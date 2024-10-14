import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import type { Actions, PageAccess } from '@/types/user';

export default {
  computed: {
    hasAccess() {
      const userStore = useUserStore();

      return (action: Actions, page: PageAccess) => {
        return userStore.hasAccess(action, page);
      };
    }
  }
};

