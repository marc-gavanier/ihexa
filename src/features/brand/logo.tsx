import type { ReactNode, SVGProps } from 'react';

export const Logo = ({
  width = 120,
  height = 120,
  title,
  color,
  ...props
}: SVGProps<SVGSVGElement> & { title?: string; color?: string }): ReactNode => {
  const fill = color ? `var(--${color})` : undefined;

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: title is conditionally provided via props, aria-hidden used when decorative
    <svg
      viewBox='0 0 120 120'
      width={width}
      height={height}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
      {...props}
      xmlns='http://www.w3.org/2000/svg'
    >
      {title ? <title>{title}</title> : null}
      {!color && (
        <defs>
          <linearGradient
            id='ihexa-a'
            x1='-546.1'
            y1='37.9'
            x2='-530.7'
            y2='-9.2'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#2375de' offset='0' />
            <stop stopColor='#06b1fe' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-b'
            x1='-527.4'
            y1='2.5'
            x2='-481.1'
            y2='-30.6'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#2174d3' offset='0' />
            <stop stopColor='#06befe' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-c'
            x1='-527.4'
            y1='20'
            x2='-479.9'
            y2='-13.8'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#2372d6' offset='0' />
            <stop stopColor='#1993f6' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-d'
            x1='-479.3'
            y1='-21.4'
            x2='-439.7'
            y2='11.9'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#4a85fa' offset='0' />
            <stop stopColor='#8532de' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-e'
            x1='-477.9'
            y1='-4.6'
            x2='-439.7'
            y2='27.9'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#6d4adc' offset='0' />
            <stop stopColor='#a338f0' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-f'
            x1='-455'
            y1='22.9'
            x2='-439.7'
            y2='70'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#622d9c' offset='0' />
            <stop stopColor='#9d36e8' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-g'
            x1='-458.4'
            y1='40.7'
            x2='-505.8'
            y2='74.5'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#6129a0' offset='0' />
            <stop stopColor='#8137e7' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-h'
            x1='-458.4'
            y1='58.2'
            x2='-504.7'
            y2='91.3'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#6627a7' offset='0' />
            <stop stopColor='#9e39ee' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-i'
            x1='-497.5'
            y1='82.5'
            x2='-546.1'
            y2='48.8'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#7b35db' offset='0' />
            <stop stopColor='#5096fd' offset='1' />
          </linearGradient>
          <linearGradient
            id='ihexa-j'
            x1='-497.5'
            y1='64.7'
            x2='-546.1'
            y2='32.8'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(952.6 124.1)scale(.988)'
          >
            <stop stopColor='#6a3cbe' offset='0' />
            <stop stopColor='#63b9fd' offset='1' />
          </linearGradient>
        </defs>
      )}
      <path
        fill={fill ?? '#5932a9'}
        d='m471.497 124.65-4.313 2.508-3.202 1.861-2.585 1.504a3.22 3.22 119.916 0 0-1.602 2.782v9.768a1.07 1.07 30.002 0 0 1.603.926l8.476-4.893a3.21 3.21 120.041 0 0 1.606-2.779zm-1.63 18.307-8.47 4.89a3.21 3.21 120.002 0 0-1.603 2.778l-.003 32.823 10.022-5.739a3.2 3.2 120.145 0 0 1.61-2.772l.046-31.054a1.067 1.067 30.042 0 0-1.601-.926z'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-d)'}
        d='m479.058 102.944-8.899 5.138 48.055 27.744V125.55a3.21 3.21 60 0 0-1.604-2.778l-34.344-19.828a3.21 3.21 180 0 0-3.208 0'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-e)'}
        d='m480.396 119.513-8.899 5.138 46.717 27.15v-10.275a3.22 3.22 60.106 0 0-1.6-2.785L483.6 119.52a3.2 3.2.106 0 0-3.204-.006'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-j)'}
        d='m450.892 188.586 8.899-5.138-46.717-27.15v10.275a3.22 3.22 60.106 0 0 1.6 2.784l33.013 19.223a3.2 3.2.106 0 0 3.205.006'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-i)'}
        d='m452.229 205.155 8.899-5.138-48.055-27.744v10.276a3.21 3.21 60 0 0 1.604 2.778l34.344 19.828a3.21 3.21 180 0 0 3.208 0'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-b)'}
        d='m464.04 94.273-30.853 17.813a3.21 3.21 120 0 0-1.604 2.778v11.642l45.747-26.412-10.082-5.821a3.21 3.21 180 0 0-3.208 0'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-h)'}
        d='m467.248 213.826 30.853-17.813a3.21 3.21 120 0 0 1.604-2.778v-11.643l-45.747 26.413 10.082 5.82a3.21 3.21 180 0 0 3.208 0'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-g)'}
        d='m466.143 197.21 33.562-19.465v-13.494l-46.85 27.14 10.082 5.822a3.2 3.2 179.944 0 0 3.206-.003'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-c)'}
        d='m465.145 110.889-33.562 19.464v13.494l46.85-27.14-10.082-5.822a3.2 3.2 179.944 0 0-3.206.003z'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-a)'}
        d='m428.251 114.935-13.573 7.837a3.21 3.21 120 0 0-1.604 2.778v25.225a3.21 3.21 60 0 0 1.604 2.778l13.573 7.837z'
        transform='translate(-404 -93.5)scale(.997)'
      />
      <path
        fill={fill ?? 'url(#ihexa-f)'}
        d='m503.036 193.163 13.574-7.837a3.21 3.21 120 0 0 1.604-2.778v-25.225a3.21 3.21 60 0 0-1.604-2.778l-13.574-7.837z'
        transform='translate(-404 -93.5)scale(.997)'
      />
    </svg>
  );
};
