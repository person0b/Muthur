<script>
  // Svelte
  import { beforeUpdate } from "svelte";

  // Stores
  import { dbTasks, dbLogs } from "../../stores/db";

  // Components
  import InfoWrapper from "../../components/InfoWrapper.svelte";
  import StatCount from "../../components/StatCount.svelte";
  import StatTask from "../../components/StatTask.svelte";
  import StatLine from "../../components/StatLine.svelte";
  import StatDate from "../../components/StatDate.svelte";

  // Model
  export let currentTerm;
  export let logs;
  let tasksCount = null;
  let allTaskCount = 0;
  let selectLogs = [];

  $: taskPercent = tasksCount / (allTaskCount / 100);

  $: $dbLogs
    .find({ term: currentTerm.name })
    .then(res => {
      selectLogs = res;
    })
    .catch(err => console.log(err));

  // Lifecycle
  beforeUpdate(() => {
    $dbTasks
      .count()
      .then(res => (allTaskCount = res))
      .catch(err => console.log(err));
    $dbTasks
      .count({ term: name })
      .then(res => (tasksCount = res))
      .catch(err => console.log(err));
  });
</script>

<style>
  li {
    padding: 0;
    margin-bottom: 15px;
  }
</style>

<InfoWrapper title={currentTerm._id}>
  <li>{currentTerm.desc}</li>
  <StatTask selector={{ term: currentTerm.name }} />
  {#if selectLogs.length}
    <StatCount {selectLogs} {logs} />
    <StatDate {selectLogs} />
    <StatLine {selectLogs} selector="division" />
    <StatLine {selectLogs} selector="type" />
  {/if}
</InfoWrapper>
