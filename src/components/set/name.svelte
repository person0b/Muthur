<script>
  // Components
  import CreateField from "../create/Field.svelte";

  // Model
  let value = ``;
  export let obj;
  export let msgError;

  // Update
  const setName = () => {
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    msgError = false;
    obj.name = value;
  };
</script>

<CreateField
  name="name"
  prop={obj.name}
  bind:value
  on:submit={setName}
  request="Enter a name"
  placeholder="required" />
