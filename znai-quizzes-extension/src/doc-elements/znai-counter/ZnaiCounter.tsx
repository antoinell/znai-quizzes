/*
 * Copyright 2026 znai maintainers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

interface CounterProps {
    initialCount?: number;
    step?: number;
}

interface CounterState {
    count: number;
    history: number[];
}

class Counter extends React.Component<CounterProps, CounterState> {
    static defaultProps = {
        initialCount: 0,
        step: 1
    };

    constructor(props: CounterProps) {
        super(props);
        this.state = {
            count: props.initialCount || 0,
            history: [props.initialCount || 0]
        };
    }

    handleIncrement = () => {
        this.setState((prevState) => {
            const newCount = prevState.count + (this.props.step || 1);
            return {
                count: newCount,
                history: [...prevState.history, newCount]
            };
        });
    };

    handleDecrement = () => {
        this.setState((prevState) => {
            const newCount = prevState.count - (this.props.step || 1);
            return {
                count: newCount,
                history: [...prevState.history, newCount]
            };
        });
    };

    handleReset = () => {
        this.setState({
            count: this.props.initialCount || 0,
            history: [this.props.initialCount || 0]
        });
    };

    render() {
        const { count, history } = this.state;

        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h2>Counter Component</h2>
                <div style={{ fontSize: '48px', margin: '20px 0' }}>
                    {count}
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        onClick={this.handleDecrement}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Decrement
                    </button>
                    <button
                        onClick={this.handleIncrement}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Increment
                    </button>
                    <button
                        onClick={this.handleReset}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Reset
                    </button>
                </div>
                <div>
                    <h3>History:</h3>
                    <p>{history.join(' → ')}</p>
                </div>
            </div>
        );
    }
}

export default Counter;
export function ZnaiCounter({ initialCount, step }: CounterProps) {
    return (
        <div>
            <Counter initialCount={initialCount} step={step} />
        </div>
    );}
