<script>
  // Utils
  const { DateTime } = require("luxon");

  // Components
  import CreateHelper from "../create/Helper.svelte";
  import CreateField from "../create/Field.svelte";

  // Model
  let now = DateTime.local().toISODate();
  export let obj;
  export let msgError;

  $: value = now;
  $: helpers = [{ name: now, desc: `format` }];

  // Update
  const setDate = () => {
    msgError = false;
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    const date = DateTime.fromISO(value);
    if (date.isValid) {
      obj.date = date.toISO();
    } else {
      value = ``;
      msgError = `inValid format`;
    }
  };
</script>

<CreateField
  name="date"
  prop={obj.date}
  bind:value
  on:submit={setDate}
  request="Enter a date"
  placeholder="required" />
{#if !obj.date}
  <CreateHelper {helpers} />
{/if}
