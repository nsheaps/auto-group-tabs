<template>
  <OverlayDialog :title="msg.settingsTitle" contrast>
    <template #activator="data">
      <slot name="activator" v-bind="data" />
    </template>

    <Card>
      <CardSection class="mode-card-section">
        <LabelText>
          {{ msg.settingsExtensionModeTitle }}
          <template #secondary>
            {{ msg.settingsExtensionModeSubtitle }}
          </template>
        </LabelText>
        <v-radio-group v-model="extensionMode.data.value" hide-details>
          <v-radio
            value="enabled"
            :label="msg.extensionModeEnabled"
            color="primary"
          >
            <template #label>
              <ToggleLabel>
                {{ msg.extensionModeEnabled }}
                <template #secondary>
                  {{ msg.extensionModeEnabledDescription }}
                </template>
              </ToggleLabel>
            </template>
          </v-radio>
          <v-radio
            value="manual"
            :label="msg.extensionModeManual"
            color="primary"
          >
            <template #label>
              <ToggleLabel>
                {{ msg.extensionModeManual }}
                <template #secondary>
                  {{ msg.extensionModeManualDescription }}
                </template>
              </ToggleLabel>
            </template>
          </v-radio>
          <v-radio
            value="disabled"
            :label="msg.extensionModeDisabled"
            color="primary"
          >
            <template #label>
              <ToggleLabel>
                {{ msg.extensionModeDisabled }}
                <template #secondary>
                  {{ msg.extensionModeDisabledDescription }}
                </template>
              </ToggleLabel>
            </template>
          </v-radio>
        </v-radio-group>
      </CardSection>
    </Card>

    <Card>
      <CardSection class="mode-card-section">
        <LabelText>
          {{ msg.settingsClickActionTitle }}
          <template #secondary>
            {{ msg.settingsClickActionSubtitle }}
          </template>
        </LabelText>
        <v-radio-group v-model="clickAction.data.value" hide-details>
          <v-radio
            value="open-popup"
            :label="msg.clickActionOpenPopup"
            color="primary"
          >
            <template #label>
              <ToggleLabel>
                {{ msg.clickActionOpenPopup }}
                <template #secondary>
                  {{ msg.clickActionOpenPopupDescription }}
                </template>
              </ToggleLabel>
            </template>
          </v-radio>
          <v-radio
            value="toggle-mode"
            :label="msg.clickActionToggleMode"
            color="primary"
          >
            <template #label>
              <ToggleLabel>
                {{ msg.clickActionToggleMode }}
                <template #secondary>
                  {{ msg.clickActionToggleModeDescription }}
                </template>
              </ToggleLabel>
            </template>
          </v-radio>
        </v-radio-group>
      </CardSection>
    </Card>

    <Card>
      <TransferDialog>
        <template #activator="{ props: activatorProps }">
          <NavigationCardSection v-bind="activatorProps">
            <Text>
              {{ msg.settingsTransferConfigurationTitle }}
              <template #secondary>
                {{ msg.settingsTransferConfigurationSubtitle }}
              </template>
            </Text>
          </NavigationCardSection>
        </template>
      </TransferDialog>
      <NavigationCardSection @click="reloadRuntime()">
        <Text>
          {{ msg.settingsForceReloadTitle }}
          <template #secondary>
            {{ msg.settingsForceReloadSubtitle }}
          </template>
        </Text>
      </NavigationCardSection>
    </Card>
  </OverlayDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Card from '@/components/Card/Card.vue'
import CardSection from '@/components/Card/CardSection.vue'
import NavigationCardSection from '@/components/Card/NavigationCardSection.vue'
import ToggleLabel from '@/components/Form/ToggleLabel.vue'
import LabelText from '@/components/LabelText.vue'
import Text from '@/components/Text.vue'
import OverlayDialog from './OverlayDialog.vue'
import TransferDialog from './TransferDialog.vue'

import { useExtensionMode, useClickAction } from '@/composables'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const step = ref('base')

const extensionMode = useExtensionMode()
const clickAction = useClickAction()

function reloadRuntime() {
  chrome.runtime.sendMessage('reload')
  window.close()
}

function close() {
  emit('close')
}
</script>

<style scoped>
.settings-dialog {
  background-color: var(--dimmed-background);
}

.mode-card-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
