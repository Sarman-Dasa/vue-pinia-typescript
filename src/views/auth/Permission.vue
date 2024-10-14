<template>
  <v-container>
    <!-- User Listing Table -->
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>User Management</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn color="primary" @click="addUserDialog = true">Add User</v-btn> -->
        </v-toolbar>
      </template>

      <template v-slot:item.abilities="{ item }">
        <div>
          <div
            v-for="(access, index) in groupedAbilities(item.abilities)"
            :key="index"
          >
            <strong>{{ access.type }}:</strong>
            <span v-for="(ability, idx) in access.abilities" :key="idx">
              {{ ability.action
              }}<span v-if="idx < access.abilities.length - 1"> | </span>
            </span>
          </div>
        </div>
      </template>

      <template v-slot:item.role="{ item }">
        <v-select
          :items="availableRoles"
          v-model="item.role"
          required
          v-if="hasAccess('update', 'user')"
          outlined
          class="rounded-select pt-3"
          @update:modelValue="updateRole($event, item.id)"
        ></v-select>
        <v-chip
          v-else
          variant="outlined"
          color="green"
          class="ml-3 text-center mb-1"
          >{{ item.role }}</v-chip
        >
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          v-if="hasAccess('update', 'user')"
          color="primary"
          @click="openEditDialog(item)"
          >Edit Abilities</v-btn
        >
      </template>
    </v-data-table>

    <!-- Edit Abilities Dialog -->
    <v-dialog v-model="editDialog" max-width="800px">
      <v-card>
        <v-card-title
          >Edit Abilities for {{ selectedUser?.fullName }}</v-card-title
        >
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col
                v-for="accessType in availableAccess"
                :key="accessType"
                cols="4"
              >
                <h3>{{ accessType }}</h3>
                <div v-for="ability in availableAbilities" :key="ability">
                  <v-checkbox
                    v-model="selectedAbilities[accessType]"
                    :label="ability"
                    :value="ability"
                  ></v-checkbox>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import type { Actions, User, UserRole } from "@/types/user";
import type { PageAccess, UserAbility } from "@/types/user";
import { showToast } from "@/plugins/toast";
import Swal from "sweetalert2";

const { users, updateUserAbilities, updateUserRole } = useUserStore();

// Reactive state
const headers = ref([
  { text: "Full Name", value: "fullName" },
  { text: "Email", value: "email" },
  { label: "Role", value: "role" },
  { text: "Abilities", value: "abilities" },
  { text: "Actions", value: "actions", sortable: false },
]);

const editDialog = ref(false);
const selectedUser = ref<User | null>(null);
const selectedAbilities = ref<Record<string, string[]>>({});
const availableAbilities = ref<Actions[]>([
  "create",
  "read",
  "update",
  "delete",
]);
const availableAccess = ref<PageAccess[]>([
  "todo",
  "book",
  "about",
  "user",
  "all",
  "home",
]);

const availableRoles = ref<UserRole[]>(["admin", "manager", "user"]);

// Group abilities by access type
const groupedAbilities = (abilities: UserAbility) => {
  const groups = {};

  abilities.forEach((ability: UserAbility) => {
    if (!groups[ability.access]) {
      groups[ability.access] = {
        type: ability.access,
        abilities: [],
      };
    }
    groups[ability.access].abilities.push(ability);
  });

  return Object.values(groups);
};

// Methods
const openEditDialog = (user: User) => {
  selectedUser.value = user;

  // Pre-fill selected abilities by access type
  availableAccess.value.forEach((access) => {
    selectedAbilities.value[access] = user.abilities
      .filter((ability) => ability.access === access)
      .map((ability) => ability.action);
  });

  editDialog.value = true;
};

const closeDialog = () => {
  editDialog.value = false;
};

const saveChanges = () => {
  if (selectedUser.value) {
    // Create a new abilities array based on selected actions and their corresponding access
    const newAbilities = [];
    Object.keys(selectedAbilities.value).forEach((access) => {
      selectedAbilities.value[access].forEach((action) => {
        newAbilities.push({ action, access });
      });
    });

    // Call the Pinia store method to update user abilities

    updateUserAbilities(selectedUser.value.id, newAbilities);
  }
  editDialog.value = false;
};

function updateRole(newRole: any, id: string) {
  Swal.fire({
    title: "Are You sure? ",
    text: "Update the user role!",
    icon: "question",
    showCancelButton: true,
    color: "#FFFFFF",
    background: "rgb(0 0 0 / 32%)",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((response) => {
    if (response.isConfirmed) {
      updateUserRole(id, newRole);
      showToast("success", `user role updated as ${newRole}`);
    }
  });
}
</script>
<style>
.rounded-select .v-input__control .v-field {
  border-radius: 50px; /* Makes the select field rounded */
  border-bottom: none; /* Removes the bottom line */
  box-shadow: none; /* Removes shadow */
}

.rounded-select .v-input__control .v-field .v-field__outline {
    border-bottom: 0px !important;
    --v-field-border-width:0px !important;
}

.rounded-select .v-input--is-focused .v-input__control {
  box-shadow: none; /* Prevents shadow on focus */
}

.rounded-select .v-input__control:hover {
  border-bottom: none; /* Removes hover effect bottom border */
}
</style>