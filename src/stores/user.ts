// Pinia Store
import { defineStore } from "pinia";
import type {
  Register,
  User,
  Login,
  Actions,
  PageAccess,
  UserAbility,
  UserRole,
} from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null as User | null, // Store the logged-in user
    users: [] as User[], // Store all users (if needed)
  }),

  actions: {
    async registerUser(registerData: Register) {
      // Define default abilities for specific email IDs
      const defaultAbilities: { [key: string]: UserAbility[] } = {
        "admin@example.com": [
          { action: "create", access: "all" },
          { action: "read", access: "all" },
          { action: "update", access: "all" },
          { action: "delete", access: "all" },
          { action: "manage", access: "all" },
        ],
        "editor@example.com": [
          { action: "read", access: "all" },
          { action: "update", access: "todo" },
        ],
      };

      const abilities = defaultAbilities[registerData.email] || 
        [
            { action: "read", access: "home" },
            { action: "update", access: "todo" }
        ];
      const id = uuidv4();
      const newUser: User = {
        id: id,
        fullName: registerData.userName,
        username: registerData.userName,
        password: registerData.password,
        email: registerData.email,
        role: "user",
        avatar: undefined,
        abilities: abilities,
      };

      this.users.push(newUser);

      localStorage.setItem("users", JSON.stringify(this.users));
    },

    async loginUser(loginData: Login) {
      // Call your API for login
      const foundUser = this.users.find(
        (user) =>
          user.email === loginData.email && user.password === loginData.password
      );
      if (foundUser) {
        this.user = foundUser;
        localStorage.setItem("userData", JSON.stringify(foundUser));
      } else {
        throw new Error("Invalid email or password");
      }
    },

    hasAccess(action: Actions, page: PageAccess): boolean {
        // Ensure the user exists and has abilities
        if (!this.user) return false;
        if(this.user.role == 'admin') {
          return true;
        }
        // Check if the user has access to the specific action and page, or if they have access to "all"
        return this.user.abilities.some(
          (ability) =>
            (ability.action === action || ability.action === "all") &&
            (ability.access === page || ability.access === "all")
        );
      },
      

    logout() {
      this.user = null; // Clear the user state on logout
      localStorage.removeItem('userData');
    },

    // Load from localStorage when the store is initialized
    loadData() {
      const storedUsers = localStorage.getItem("users");
      const loginUser = localStorage.getItem("userData");
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }

      if (loginUser) {
        this.user = JSON.parse(loginUser);
      }
    },

    updateUserAbilities(userId: string, newAbilities: UserAbility[]) {
      const userIndex = this.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].abilities = newAbilities;
        localStorage.setItem("users", JSON.stringify(this.users));
      } else {
        console.error(`User with ID ${userId} not found.`);
      }
    },

    updateUserRole(userId: string, newRole:UserRole) {
      const userIndex = this.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].role = newRole;
        localStorage.setItem("users", JSON.stringify(this.users));
      } else {
        console.error(`User with ID ${userId} not found.`);
      }
    }
  },
});
