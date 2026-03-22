import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Range, type RangeProps } from './range';

const meta: Meta<typeof Range> = {
  title: 'Libraries/UI/Primitives/Range',
  component: Range,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Range slider component for numeric input. Supports semantic colors, sizes, and custom min/max/step values.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'range-neutral',
        'range-primary',
        'range-secondary',
        'range-accent',
        'range-info',
        'range-success',
        'range-warning',
        'range-error'
      ],
      description: 'Semantic color of the range slider',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    scale: {
      control: 'select',
      options: ['range-xs', 'range-sm', 'range-md', 'range-lg', 'range-xl'],
      description: 'Size of the range slider',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    value: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Current value',
      table: {
        category: 'State',
        type: { summary: 'number' }
      }
    },
    onChange: {
      description: 'Callback when value changes',
      table: {
        category: 'Events',
        type: { summary: '(value: number) => void' }
      }
    },
    min: {
      control: 'number',
      description: 'Minimum value',
      table: {
        category: 'Range',
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    },
    max: {
      control: 'number',
      description: 'Maximum value',
      table: {
        category: 'Range',
        type: { summary: 'number' },
        defaultValue: { summary: '1' }
      }
    },
    step: {
      control: 'number',
      description: 'Step increment',
      table: {
        category: 'Range',
        type: { summary: 'number' },
        defaultValue: { summary: '0.01' }
      }
    },
    className: {
      description: 'Additional CSS classes',
      table: { category: 'Styling' }
    }
  },
  decorators: [
    (Story) => (
      <div className='w-64'>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} />;
  },
  parameters: {
    docs: {
      description: { story: 'Default range slider with value at 50%.' }
    }
  }
};

export const Empty: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <Range value={value} onChange={setValue} />;
  },
  parameters: {
    docs: {
      description: { story: 'Range slider at minimum value.' }
    }
  }
};

export const Full: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    return <Range value={value} onChange={setValue} />;
  },
  parameters: {
    docs: {
      description: { story: 'Range slider at maximum value.' }
    }
  }
};

// =============================================================================
// Colors
// =============================================================================

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} color='range-primary' />;
  },
  parameters: {
    docs: {
      description: { story: 'Primary color range slider.' }
    }
  }
};

export const Secondary: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} color='range-secondary' />;
  },
  parameters: {
    docs: {
      description: { story: 'Secondary color range slider.' }
    }
  }
};

export const Accent: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} color='range-accent' />;
  },
  parameters: {
    docs: {
      description: { story: 'Accent color range slider.' }
    }
  }
};

export const Success: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} color='range-success' />;
  },
  parameters: {
    docs: {
      description: { story: 'Success color range slider.' }
    }
  }
};

export const Warning: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} color='range-warning' />;
  },
  parameters: {
    docs: {
      description: { story: 'Warning color range slider.' }
    }
  }
};

export const ErrorColor: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} color='range-error' />;
  },
  parameters: {
    docs: {
      description: { story: 'Error color range slider.' }
    }
  }
};

export const AllColors: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, number>>({
      neutral: 0.5,
      primary: 0.5,
      secondary: 0.5,
      accent: 0.5,
      info: 0.5,
      success: 0.5,
      warning: 0.5,
      error: 0.5
    });
    const colors: Array<RangeProps['color']> = [
      'range-neutral',
      'range-primary',
      'range-secondary',
      'range-accent',
      'range-info',
      'range-success',
      'range-warning',
      'range-error'
    ];
    return (
      <div className='flex flex-col gap-2'>
        {colors.map((color) => {
          const key = color?.replace('range-', '') ?? 'default';
          return (
            <div key={color} className='flex items-center gap-2'>
              <span className='w-20 text-xs'>{key}</span>
              <Range value={values[key] ?? 0.5} onChange={(v) => setValues((prev) => ({ ...prev, [key]: v }))} color={color} />
            </div>
          );
        })}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all available colors.' }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraSmall: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} scale='range-xs' />;
  },
  parameters: {
    docs: {
      description: { story: 'Extra small range slider.' }
    }
  }
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} scale='range-sm' />;
  },
  parameters: {
    docs: {
      description: { story: 'Small range slider.' }
    }
  }
};

export const Medium: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} scale='range-md' />;
  },
  parameters: {
    docs: {
      description: { story: 'Medium range slider (default).' }
    }
  }
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} scale='range-lg' />;
  },
  parameters: {
    docs: {
      description: { story: 'Large range slider.' }
    }
  }
};

export const ExtraLarge: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} scale='range-xl' />;
  },
  parameters: {
    docs: {
      description: { story: 'Extra large range slider.' }
    }
  }
};

export const AllScales: Story = {
  render: () => {
    const [values, setValues] = useState({ xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5 });
    const scales: Array<{ key: keyof typeof values; scale: RangeProps['scale'] }> = [
      { key: 'xs', scale: 'range-xs' },
      { key: 'sm', scale: 'range-sm' },
      { key: 'md', scale: 'range-md' },
      { key: 'lg', scale: 'range-lg' },
      { key: 'xl', scale: 'range-xl' }
    ];
    return (
      <div className='flex flex-col gap-3'>
        {scales.map(({ key, scale }) => (
          <div key={key} className='flex items-center gap-2'>
            <span className='w-8 text-xs uppercase'>{key}</span>
            <Range
              value={values[key]}
              onChange={(v) => setValues((prev) => ({ ...prev, [key]: v }))}
              scale={scale}
              color='range-primary'
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all available sizes.' }
    }
  }
};

// =============================================================================
// Custom Range
// =============================================================================

export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return <Range value={value} onChange={setValue} min={0} max={100} step={1} />;
  },
  parameters: {
    docs: {
      description: { story: 'Range slider with custom min (0), max (100), and step (1).' }
    }
  }
};

export const NegativeRange: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <Range value={value} onChange={setValue} min={-50} max={50} step={5} />;
  },
  parameters: {
    docs: {
      description: { story: 'Range slider with negative values (-50 to 50).' }
    }
  }
};

export const DecimalStep: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return <Range value={value} onChange={setValue} min={0} max={1} step={0.1} />;
  },
  parameters: {
    docs: {
      description: { story: 'Range slider with 0.1 step increments.' }
    }
  }
};

// =============================================================================
// With Steps
// =============================================================================

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div>
        <Range value={value} onChange={setValue} min={0} max={100} step={25} color='range-primary' />
        <div className='mt-2 flex justify-between px-2.5 text-xs'>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Range with step marks.' }
    }
  }
};

export const WithStepsAndLabels: Story = {
  render: () => {
    const [value, setValue] = useState(2);
    return (
      <div>
        <Range value={value} onChange={setValue} min={1} max={5} step={1} color='range-primary' />
        <div className='mt-2 flex justify-between px-2.5 text-xs'>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
        <div className='mt-1 flex justify-between px-2.5 text-xs'>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Range with step marks and numeric labels.' }
    }
  }
};

// =============================================================================
// Use Cases
// =============================================================================

export const OpacitySlider: Story = {
  render: () => {
    const [opacity, setOpacity] = useState(1);
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <span className='w-16 text-sm text-neutral'>Opacity</span>
          <Range value={opacity} onChange={setOpacity} className='flex-1' />
          <span className='w-12 text-right text-sm text-neutral'>{Math.round(opacity * 100)}%</span>
        </div>
        <div className='h-16 rounded-lg bg-primary' style={{ opacity }} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Opacity control slider with live preview.' }
    }
  }
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState(75);
    return (
      <div className='flex items-center gap-3'>
        <span className='text-lg'>🔈</span>
        <Range value={volume} onChange={setVolume} min={0} max={100} step={1} className='flex-1' />
        <span className='text-lg'>{volume >= 50 ? '🔊' : '🔉'}</span>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Volume control with dynamic icons.' }
    }
  }
};

export const TemperatureControl: Story = {
  render: () => {
    const [temp, setTemp] = useState(22);
    const getColor = (t: number) => {
      if (t < 18) return 'text-info';
      if (t > 26) return 'text-error';
      return 'text-success';
    };
    return (
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-neutral'>Temperature</span>
          <span className={`font-bold ${getColor(temp)}`}>{temp}°C</span>
        </div>
        <Range value={temp} onChange={setTemp} min={16} max={30} step={1} />
        <div className='flex justify-between text-xs text-neutral'>
          <span>16°C</span>
          <span>30°C</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Temperature control with color feedback.' }
    }
  }
};

export const PriceFilter: Story = {
  render: () => {
    const [maxPrice, setMaxPrice] = useState(500);
    return (
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-neutral'>Max Price</span>
          <span className='font-semibold'>${maxPrice}</span>
        </div>
        <Range value={maxPrice} onChange={setMaxPrice} min={0} max={1000} step={50} />
        <div className='flex justify-between text-xs text-neutral'>
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Price filter slider for e-commerce.' }
    }
  }
};

export const ZoomLevel: Story = {
  render: () => {
    const [zoom, setZoom] = useState(100);
    return (
      <div className='flex items-center gap-3'>
        <button type='button' className='btn btn-sm btn-ghost' onClick={() => setZoom(Math.max(50, zoom - 10))}>
          −
        </button>
        <Range value={zoom} onChange={setZoom} min={50} max={200} step={10} className='flex-1' />
        <button type='button' className='btn btn-sm btn-ghost' onClick={() => setZoom(Math.min(200, zoom + 10))}>
          +
        </button>
        <span className='w-12 text-right text-sm'>{zoom}%</span>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Zoom control with increment/decrement buttons.' }
    }
  }
};

export const ColorPicker: Story = {
  render: () => {
    const [hue, setHue] = useState(180);
    return (
      <div className='flex flex-col gap-4'>
        <div className='h-16 rounded-lg' style={{ backgroundColor: `hsl(${hue}, 70%, 50%)` }} />
        <div className='flex items-center gap-3'>
          <span className='text-sm text-neutral'>Hue</span>
          <Range value={hue} onChange={setHue} min={0} max={360} step={1} className='flex-1' />
          <span className='w-12 text-right text-sm'>{hue}°</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Hue picker with color preview.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const colors: Array<RangeProps['color']> = [
  undefined,
  'range-neutral',
  'range-primary',
  'range-secondary',
  'range-accent',
  'range-info',
  'range-success',
  'range-warning',
  'range-error'
];
const scales: Array<RangeProps['scale']> = [undefined, 'range-xs', 'range-sm', 'range-md', 'range-lg', 'range-xl'];

export const Matrix: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, number>>({});
    const getKey = (color?: string, scale?: string) => `${color ?? 'default'}-${scale ?? 'default'}`;
    return (
      <div className='flex flex-col gap-6'>
        {scales.map((scale) => (
          <div key={scale ?? 'default-scale'}>
            <h3 className='mb-2 font-semibold'>{scale?.replace('range-', '') ?? 'Default'}</h3>
            <div className='flex flex-col gap-1'>
              {colors.map((color) => {
                const key = getKey(color, scale);
                return (
                  <div key={key} className='flex items-center gap-2'>
                    <span className='w-20 text-xs'>{color?.replace('range-', '') ?? 'default'}</span>
                    <Range
                      value={values[key] ?? 0.5}
                      onChange={(v) => setValues((prev) => ({ ...prev, [key]: v }))}
                      color={color}
                      scale={scale}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of all scale × color combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const InteractionTest: Story = {
  render: () => {
    const [value, setValue] = useState(0.5);
    return (
      <div className='flex items-center gap-3'>
        <Range value={value} onChange={setValue} color='range-primary' data-testid='range-slider' />
        <span data-testid='range-value'>{value.toFixed(2)}</span>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByTestId('range-slider');
    const valueDisplay = canvas.getByTestId('range-value');

    await expect(slider).toBeVisible();
    await expect(valueDisplay).toHaveTextContent('0.50');

    await userEvent.click(slider);
  },
  parameters: {
    docs: {
      description: { story: 'Verifies range slider renders and displays value.' }
    }
  }
};
