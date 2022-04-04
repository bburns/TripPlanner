
// using mixin pattern to split class into smaller files
import { NeomemBase } from './neomemBase';
import { NeomemParentChild } from './neomemParentChild';

export class Neomem extends NeomemParentChild(NeomemBase) {
}
