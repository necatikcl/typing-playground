export enum Shortcuts {
  BlurInput = 'esc',
  FocusInput = 'enter',
  Restart = 'cmd+r',
  Edit = 'cmd+e',
}

const isModifierPressed = (e: KeyboardEvent, modifier?: string) => {
  if (modifier === 'cmd') return e.metaKey || e.ctrlKey;
  return true;
};

const isKeyPressed = (e: KeyboardEvent, key: string) => {
  const eventKey = e.key.toLowerCase();

  if (key === 'esc') return eventKey === 'escape';
  return eventKey === key;
};

const useShortcut = (
  shortcut: `${Shortcuts}`,
  handler: () => void,
) => {
  if (import.meta.env.DEV) return;

  const keys = shortcut.split('+');

  const modifier = keys.length > 1 ? keys[0] : undefined;
  const key = keys.length > 1 ? keys[1] : keys[0];

  window.addEventListener('keydown', (e) => {
    const modifierPressed = isModifierPressed(e, modifier);
    const keyPressed = isKeyPressed(e, key);

    if (modifierPressed && keyPressed) {
      e.preventDefault();
      handler();
    }
  });
};

export default useShortcut;
