/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

var model = {
  type: 'model-layer',
  fillStyle: 'white',
  width: 1600,
  height: 900,
  components: [
    {
      type: 'select',
      top: 30,
      left: 30,
      width: 200,
      height: 200,
      textAlign: 'left',
      fontSize: '30',
      fontFamily: 'serif',
      fillStyle: 'red',
      // hidden: true,
      text: '이 예제에서는 숨김 속성을 설명합니다.'
    } /*, {
      type: 'text',
  
      top: 50,
      left: 400,
      width: 100,
      height: 100,
      rotation: 0,
  
      textAlign: 'center',
      text: 'Align Center'
    }, {
      type: 'text',
  
      top: 70,
      left: 400,  // textAlign이 이 포인트 기준임.
      width: 100,
      height: 100,
      rotation: 0,
  
      textAlign: 'right',
      text: 'Align Right'
    }, {
      type: 'text',
  
      top: 90,
      left: 400,
      width: 100,
      height: 50,
      rotation: 0,
  
      textAlign: 'left||end',
      text: 'Align Left Start'
    }, {
      type: 'text',
  
      top: 100,
      left: 500,
      width: 100,
      height: 50,
      rotation: 0,
  
      fontSize: '20',
      fontFamily: 'serif',
      text: 'Hello World^^'
    }, {
      type: 'text',
  
      top: 100,
      left: 500,
      width: 100,
      height: 50,
      rotation: 0.5,
  
      fontSize: '20',
      fontFamily: 'serif',
      fontColor: 'red',
      bold: 'bold',
      italic: 'italic',
      text: 'Hello World^^'
    }*/
  ]
}

var p = null

function create() {
  p = scene.create({
    target: 'scene',
    model: model,
    mode: 1,
    layers: [
      {
        type: 'selection-layer'
      },
      {
        type: 'modeling-layer'
      },
      {
        type: 'guide-layer'
      },
      {
        type: 'shift-layer'
      }
    ],
    handlers: ['text-editor', 'move-handler']
  })
  // p.scale = {x: 5, y: 5}
}

function dispose() {
  p.dispose()
}

function change() {
  p.change('image-view', {
    src: '../.resources/mushroom.png'
  })
}

function fullscreen() {
  p.fullscreen()
}

function grouping() {
  console.log('grouping')

  var xs = []
  var ys = []
  components = []

  p.selected.forEach(c => {
    c.path.forEach(point => {
      xs.push(point.x)
      ys.push(point.y)
    })

    components.push(c)
    p.remove(c)
  })

  var left = min(xs)
  var width = max(xs) - left

  var top = min(ys)
  var height = max(ys) - top

  var group = { top, left, width, height }
  group.type = 'group'

  p.add(group)

  components.forEach(s => {
    var bounds = s.bounds
    bounds.left -= group.left
    bounds.top -= group.top

    s.bounds = bounds
  })

  var selected = p.selected
  var myGroup = selected[selected.length - 1]
  myGroup.add(components)
}

function ungrouping() {
  console.log('ungrouping')

  p.selected.forEach(g => {
    if (g.model.type != 'group') return

    var components = []
    g.components.forEach(c => {
      c.parent = null
      components.push(c)
    })

    components.forEach(c => {
      var bounds = c.bounds
      bounds.left += g.model.left
      bounds.top += g.model.top
      c.bounds = bounds

      p.add(c.model)
    })

    g.parent.removeComponent(g)
  })
}

function min(n) {
  var min
  n.forEach(i => {
    if (min) {
      min = Math.min(min, i)
    } else {
      min = i
    }
  })

  return min
}

function max(n) {
  var max
  n.forEach(i => {
    if (max) {
      max = Math.max(max, i)
    } else {
      max = i
    }
  })

  return max
}
