<script lang="ts">
  import { page } from "$app/stores";
  import {
    User,
    Mail,
    Phone,
    MapPin,
    Tag,
    Edit3,
    Save,
    Calendar,
    Shield,
    Loader2,
  } from "@lucide/svelte";
  import { PUBLIC_API_URL } from "$env/static/public";
  let contact: any = null;
  let isLoading = true;
  let isSaving = false;
  let errorMsg = "";

  let modalInstance: HTMLDialogElement;

  // Form State
  let formData = {
    name: "",
    email: "",
    phone_no: "",
    address: "",
    ghl_id: "",
    tags_added: "",
  };

  async function fetchContact(id: string) {
    isLoading = true;
    errorMsg = "";
    try {
      const res = await fetch(`${PUBLIC_API_URL}/contacts/${id}`, {
        headers: {
          accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch contact information");
      contact = await res.json();

      // Initialize form data
      formData = {
        name: contact.name || "",
        email: contact.email || "",
        phone_no: contact.phone_no || "",
        address: contact.address || "",
        ghl_id: contact.ghl_id || "",
        tags_added: contact.detail?.tags?.added || "",
      };
    } catch (err: any) {
      errorMsg = err.message;
    } finally {
      isLoading = false;
    }
  }

  // Fetch as soon as the param is available (or changes)
  $: if ($page.params.cntid) {
    fetchContact($page.params.cntid);
  }

  async function handleSubmit() {
    isSaving = true;
    errorMsg = "";

    // Ensure empty strings are sent as null if backend expects optional nullables
    const payload = {
      name: formData.name || null,
      email: formData.email || null,
      phone_no: formData.phone_no || null,
      address: formData.address || null,
      ghl_id: formData.ghl_id || null,
      detail: {
        tags: {
          added: formData.tags_added || null,
        },
      },
    };

    try {
      const res = await fetch(
        `${PUBLIC_API_URL}/contacts/${$page.params.cntid}`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.detail || "Failed to update contact");
      }

      const updatedContact = await res.json();
      contact = updatedContact;
      modalInstance?.close();
    } catch (err: any) {
      errorMsg = err.message;
    } finally {
      isSaving = false;
    }
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function openEditModal() {
    // Reset form data to current contact state before opening
    formData = {
      name: contact.name || "",
      email: contact.email || "",
      phone_no: contact.phone_no || "",
      address: contact.address || "",
      ghl_id: contact.ghl_id || "",
      tags_added: contact.detail?.tags?.added || "",
    };
    errorMsg = "";
    modalInstance?.showModal();
  }
</script>

<div class="p-6 max-w-7xl mx-auto space-y-6">
  {#if isLoading}
    <div class="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 class="animate-spin text-primary" size={48} />
      <span class="text-gray-500 font-medium animate-pulse"
        >Loading contact data...</span
      >
    </div>
  {:else if errorMsg && !contact}
    <div class="alert alert-error shadow-sm max-w-2xl mx-auto">
      <span>{errorMsg}</span>
      <button
        class="btn btn-sm"
        on:click={() => fetchContact($page.params.cntid)}>Retry</button
      >
    </div>
  {:else if contact}
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div class="flex items-center gap-4">
        <div class="avatar placeholder">
          <div
            class="bg-primary text-primary-content rounded-xl w-16 h-16 text-2xl font-bold"
          >
            <span>{contact.name?.charAt(0) || "?"}</span>
          </div>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-base-content">{contact.name}</h1>
          <div class="flex flex-wrap items-center gap-2 mt-1">
            <span class="badge badge-primary badge-outline font-semibold"
              >ID: {contact.id}</span
            >
            {#if contact.detail?.tags?.added}
              <span class="badge badge-accent gap-1 font-semibold">
                <Tag size={12} />
                {contact.detail.tags.added}
              </span>
            {/if}
          </div>
        </div>
      </div>

      <button class="btn btn-primary" on:click={openEditModal}>
        <Edit3 size={18} /> Edit Contact
      </button>
    </div>

    <!-- Details Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <!-- Contact Information Card -->
      <div class="card bg-base-100 shadow-xl border border-base-200">
        <div class="card-body">
          <h2 class="card-title text-primary border-b border-base-200 pb-2">
            <User size={20} /> Contact Information
          </h2>

          <div class="flex flex-col gap-4 mt-2">
            <div class="flex items-start gap-3">
              <Mail class="text-base-content/50 mt-1" size={18} />
              <div>
                <p class="text-xs font-semibold text-base-content/50 uppercase">
                  Email
                </p>
                <p class="text-base-content font-medium break-all">
                  {contact.email || "N/A"}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <Phone class="text-base-content/50 mt-1" size={18} />
              <div>
                <p class="text-xs font-semibold text-base-content/50 uppercase">
                  Phone
                </p>
                <p class="text-base-content font-medium">
                  {contact.phone_no || "N/A"}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <MapPin class="text-base-content/50 mt-1" size={18} />
              <div>
                <p class="text-xs font-semibold text-base-content/50 uppercase">
                  Address
                </p>
                <p class="text-base-content font-medium whitespace-pre-wrap">
                  {contact.address || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Details Card -->
      <div class="card bg-base-100 shadow-xl border border-base-200">
        <div class="card-body">
          <h2 class="card-title text-secondary border-b border-base-200 pb-2">
            <Shield size={20} /> System Details
          </h2>

          <div class="flex flex-col gap-4 mt-2">
            <div class="flex items-start gap-3">
              <Calendar class="text-base-content/50 mt-1" size={18} />
              <div>
                <p class="text-xs font-semibold text-base-content/50 uppercase">
                  Created
                </p>
                <p class="text-base-content font-medium">
                  {formatDate(contact.created_at)}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <Calendar class="text-base-content/50 mt-1" size={18} />
              <div>
                <p class="text-xs font-semibold text-base-content/50 uppercase">
                  Last Updated
                </p>
                <p class="text-base-content font-medium">
                  {formatDate(contact.updated_at)}
                </p>
              </div>
            </div>

            <div class="mt-2 p-3 bg-base-200 rounded-lg">
              <p
                class="text-xs font-semibold text-base-content/50 uppercase mb-1"
              >
                GHL Integration ID
              </p>
              <p
                class="font-mono text-sm text-base-content whitespace-pre-wrap break-all"
              >
                {contact.ghl_id || "Not connected"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- DaisyUI Standard Modal -->
<dialog bind:this={modalInstance} class="modal modal-bottom sm:modal-middle">
  <div class="modal-box p-0 overflow-hidden bg-base-100 max-w-2xl">
    <!-- Modal Header -->
    <div
      class="bg-primary text-primary-content p-4 flex justify-between items-center"
    >
      <h3 class="font-bold text-lg flex items-center gap-2">
        <Edit3 size={20} /> Edit Contact
      </h3>
      <form method="dialog">
        <!-- Close button standard daisyui -->
        <button
          class="btn btn-sm btn-circle btn-ghost text-primary-content hover:bg-primary-focus"
          >✕</button
        >
      </form>
    </div>

    <!-- Modal Form Body -->
    <div class="p-6 max-h-[70vh] overflow-y-auto">
      {#if errorMsg}
        <div class="alert alert-error mb-4 shadow-sm">
          <span>{errorMsg}</span>
        </div>
      {/if}

      <form
        id="editForm"
        class="space-y-4"
        on:submit|preventDefault={handleSubmit}
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Name -->
          <div class="form-control w-full">
            <label class="label" for="name"
              ><span class="label-text font-semibold">Full Name</span></label
            >
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              class="input input-bordered w-full"
              placeholder="Contact Name"
              required
            />
          </div>

          <!-- Email -->
          <div class="form-control w-full">
            <label class="label" for="email"
              ><span class="label-text font-semibold">Email Address</span
              ></label
            >
            <input
              id="email"
              type="email"
              bind:value={formData.email}
              class="input input-bordered w-full"
              placeholder="email@example.com"
            />
          </div>

          <!-- Phone -->
          <div class="form-control w-full">
            <label class="label" for="phone"
              ><span class="label-text font-semibold">Phone Number</span></label
            >
            <input
              id="phone"
              type="text"
              bind:value={formData.phone_no}
              class="input input-bordered w-full"
              placeholder="(555) 555-5555"
            />
          </div>

          <!-- Tags -->
          <div class="form-control w-full">
            <label class="label" for="tags"
              ><span class="label-text font-semibold">Source Tag</span></label
            >
            <input
              id="tags"
              type="text"
              bind:value={formData.tags_added}
              class="input input-bordered w-full"
              placeholder="e.g. ghl"
            />
          </div>

          <!-- Address -->
          <div class="form-control w-full md:col-span-2">
            <label class="label" for="address"
              ><span class="label-text font-semibold">Address</span></label
            >
            <textarea
              id="address"
              bind:value={formData.address}
              class="textarea textarea-bordered w-full h-24"
              placeholder="Physical Address"
            ></textarea>
          </div>

          <!-- GHL ID -->
          <div class="form-control w-full md:col-span-2">
            <label class="label" for="ghl_id">
              <span class="label-text font-semibold">GHL ID</span>
              <span class="label-text-alt text-base-content/50">Optional</span>
            </label>
            <input
              id="ghl_id"
              type="text"
              bind:value={formData.ghl_id}
              class="input input-bordered w-full font-mono text-sm"
              placeholder="GHL Integration ID"
            />
          </div>
        </div>
      </form>
    </div>

    <!-- Modal Footer Actions -->
    <div
      class="bg-base-200 p-4 border-t border-base-300 flex justify-end gap-2"
    >
      <form method="dialog">
        <button class="btn btn-ghost" disabled={isSaving}>Cancel</button>
      </form>
      <button
        type="submit"
        form="editForm"
        class="btn btn-primary min-w-[120px]"
        disabled={isSaving}
      >
        {#if isSaving}
          <Loader2 class="animate-spin" size={18} /> Saving
        {:else}
          <Save size={18} /> Save Contact
        {/if}
      </button>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
