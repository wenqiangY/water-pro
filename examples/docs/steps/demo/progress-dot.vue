<template>
  <div>
    <a-steps progress-dot :current="1">
      <a-step title="Finished" description="This is a description." />
      <a-step title="In Progress" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
    <a-divider />
    <a-steps progress-dot :current="1" direction="vertical">
      <a-step title="Finished" description="This is a description. This is a description." />
      <a-step title="Finished" description="This is a description. This is a description." />
      <a-step title="In Progress" description="This is a description. This is a description." />
      <a-step title="Waiting" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
  </div>
</template>
