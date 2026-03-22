import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';
import { cn } from '../utils';

type SortableItemProps = {
  id: string;
  children: (props: { isDragging: boolean; dragHandleProps: Record<string, unknown> }) => ReactNode;
  className?: string;
};

export const SortableItem = ({ id, children, className }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li ref={setNodeRef} style={style} className={cn(className, isDragging && 'opacity-50')}>
      {children({ isDragging, dragHandleProps: { ...attributes, ...listeners } })}
    </li>
  );
};

type SortableListProps<T extends { id: string }> = {
  items: T[];
  onReorder: (reorderedItems: T[]) => void;
  children: (item: T) => ReactNode;
  className?: string;
};

export const SortableList = <T extends { id: string }>({ items, onReorder, children, className }: SortableListProps<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!(over && active.id !== over.id)) return;
    onReorder(
      arrayMove(
        items,
        items.findIndex((item) => item.id === active.id),
        items.findIndex((item) => item.id === over.id)
      )
    );
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <ul className={cn('flex flex-col gap-1', className)}>{items.map(children)}</ul>
      </SortableContext>
    </DndContext>
  );
};
