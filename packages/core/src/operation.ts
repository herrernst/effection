/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Task } from './task';
import type { Labels } from './labels';
import type { FutureLike } from './future';

export interface Labelled {
  name?: string;
  labels?: Labels;
}

export interface OperationIterator<TOut> extends Generator<Operation<any>, TOut | undefined, any>, Labelled {
};

export interface OperationPromise<TOut> extends PromiseLike<TOut>, Labelled {
};

export interface OperationResolution<TOut> extends Labelled {
  perform(resolve: (value: TOut) => void, reject: (err: Error) => void): void | (() => void);
};

export interface OperationFuture<TOut> extends FutureLike<TOut>, Labelled {
};

export interface Resource<TOut> extends Labelled {
  init(scope: Task, local: Task): OperationIterator<TOut>;
}

export type OperationValue<TOut> = OperationPromise<TOut> | OperationIterator<TOut> | OperationResolution<TOut> | OperationFuture<TOut> | undefined;

export interface OperationFunction<TOut> extends Labelled {
  (task: Task<TOut>): OperationValue<TOut>;
}

export type Operation<TOut> = OperationValue<TOut> | OperationFunction<TOut> | Resource<TOut>;
