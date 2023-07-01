import type { ComponentType, FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

/**
 * Wrap a component ina React Dnd provider.
 */
export default function withDnd<T extends JSX.IntrinsicAttributes>(Component: FC<T>): FC<T> {
  const wrapped: ComponentType<T> = (props) => {
    return (
      <DndProvider backend={HTML5Backend}>
        <Component {...props} />
      </DndProvider>
    );
  };

  wrapped.displayName = `withDnd_${Component.displayName}`;

  return wrapped;
}
