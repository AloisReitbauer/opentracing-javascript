
import { expect } from 'chai';
import { FORMAT_TEXT_MAP, initGlobalTracer, MockTracer } from '../index';

export function mockTracerimplementationTests(createTracer = () => new MockTracer()): void {

    describe('Mock Tracer Implementation', () => {
        describe('Tracer#inject', () => {

            it('should handle Spans, SpanContexts and tags and logs ', () => {
                const tracer = createTracer();
                const span = tracer.startSpan('test_operation');
                span.setTag('tag name', 'tag value');
                span.log({state: 'test'});
                // currently injection is not implemented
                // const textCarrier = {};
                // expect(() => { tracer.inject(span, FORMAT_TEXT_MAP, textCarrier); }).to.not.throw(Error);
            });
        });

        describe ('Tracer#report', () => {

            it ('should not throw exceptions when running report', () => {
                const tracer = createTracer();
                const span = tracer.startSpan('test_operation');
                span.finish ();
                expect (() => { tracer.report (); }).to.not.throw (Error);
            });
        });

        describe('Span#finish', () => {
            it('should return undefined', () => {
                const tracer = createTracer();
                const span = tracer.startSpan('test_span');
                expect(span.finish()).to.be.undefined;
            });
        });

        describe('Miscellaneous', () => {
            describe('Memory usage', () => {
                it('should not report leaks after setting the global tracer', () => {
                    initGlobalTracer(createTracer());
                });
            });
        });
    });
}

export default mockTracerimplementationTests;