import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import {
  EnumBlockType,
  LayoutType,
  OptionsDrop,
} from '../interfaces/types';
import { ContaierDropElement } from './ContaierDropElement';
import { ContainerDragElement } from './ContainerDragElement';

interface LayoutBuilderProps {
  type?: EnumBlockType;
  layouts: LayoutType[];
  onDrop: (options: OptionsDrop) => void;
  renderBlock: (block: any) => ReactNode | JSX.Element;
}

export const LayoutRecursive: FC<LayoutBuilderProps> = ({
  layouts,
  onDrop,
  type,
  renderBlock,
}) => {
  return (
    <div
      className={classNames(
        type === 'row' ? 'lb-row' : '',
        `lb-${type || 'wrapper'}`,
      )}
    >
      {layouts.map((container) => {
        const children = container.children;

        return (
          <ContaierDropElement
            key={container.id}
            data={container}
            onDrop={onDrop}
          >
            <ContainerDragElement data={container}>
              {children ? (
                <LayoutRecursive
                  layouts={container.children as any}
                  onDrop={onDrop}
                  type={container.type}
                  renderBlock={renderBlock}
                />
              ) : (
                <div className="lb-block">
                  {container.block
                    ? renderBlock(container.block)
                    : null}
                </div>
              )}
            </ContainerDragElement>
          </ContaierDropElement>
        );
      })}
    </div>
  );
};