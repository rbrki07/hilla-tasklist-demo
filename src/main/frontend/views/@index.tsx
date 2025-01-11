import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { VerticalLayout } from '@vaadin/react-components';

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Simple Task Application',
};

export default function HelloHillaView() {
  return (
    <VerticalLayout theme="margin">
      <h2>Welcome to Simple Task Application</h2>
      <p>Select an item from the menu</p>
    </VerticalLayout>
  );
}
