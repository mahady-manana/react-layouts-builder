import classNames from 'classnames';
import React, { FC } from 'react';
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
}

export const LayoutRecursive: FC<LayoutBuilderProps> = ({
  data,
  onDrop,
  isRow,
  type,
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
                />
              ) : (
                <div className="lb-block">
                  {container.block?.type === 'text' ? (
                    <p>{container.block?.textContent}</p>
                  ) : null}
                  {container.block?.type === 'LINK' ? (
                    <button className="btn">
                      {container.block.buttonText}
                    </button>
                  ) : null}
                </div>
              )}
            </ContainerDragElement>
          </ContaierDropElement>
        );
      })}
    </div>
  );
};
