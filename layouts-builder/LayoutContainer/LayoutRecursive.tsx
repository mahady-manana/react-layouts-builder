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
  data: LayoutType[];
  isRow?: boolean;
  onDrop: (options: OptionsDrop) => void;
  renderBlock: (block: any) => ReactNode | JSX.Element;
}

export const LayoutRecursive: FC<LayoutBuilderProps> = ({
  data,
  onDrop,
  isRow,
  type,
  renderBlock,
}) => {
  return (
    <div
      className={classNames(
        isRow ? 'lb-row' : '',
        `lb-${type || 'wrapper'}`,
      )}
    >
      {data.map((container) => {
        return (
          <ContaierDropElement
            key={container.id}
            type={container.type as EnumBlockType}
            data={container}
            onDrop={onDrop}
          >
            <ContainerDragElement
              data={container}
              type={container.type}
            >
              {container.children ? (
                <LayoutRecursive
                  isRow={container.properties?.orientation === 'row'}
                  data={container.children as any}
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
