import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

const delay = (ms) => new Promise((rev) => setTimeout(rev, ms))

const onDragEnd = async (result, columns, mutation) => {
  if (!result.destination) return
  const { source, destination } = result
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)

    await mutation.mutateAsync({ id: removed._id, status: destColumn.name })
  }
}

interface DragAndDropProps {
  data: any
}

function DragAndDrop(props: DragAndDropProps) {
  const queryClient = useQueryClient()
  const { data } = props
  useEffect(() => {
    console.log(data)
  }, [data])
  const columnsFromBackend = {
    [uuidv4()]: {
      name: 'pending',
      items: data.filter((ticket) => ticket.status === 'pending')
    },
    [uuidv4()]: {
      name: 'accepted',
      items: data.filter((ticket) => ticket.status === 'accepted')
    },
    [uuidv4()]: {
      name: 'resolved',
      items: data.filter((ticket) => ticket.status === 'resolved')
    },
    [uuidv4()]: {
      name: 'rejected',
      items: data.filter((ticket) => ticket.status === 'rejected')
    }
  }

  const mutation = useMutation({
    mutationFn: (data) => {
      const { id, status } = data

      return fetch(`http://localhost:8000/ticket/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: status })
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets'])
    }
  })
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        height: '100%'
      }}
    >
      <DragDropContext
        onDragEnd={async (result) =>
          await onDragEnd(result, columnsFromBackend, mutation)
        }
      >
        {Object.entries(columnsFromBackend).map(([id, column]) => {
          let backgroundColor
          switch (column.name) {
            case 'pending':
              backgroundColor = 'rgb(252 211 77)'
              break
            case 'accepted':
              backgroundColor = 'rgb(134 239 172)'
              break
            case 'resolved':
              backgroundColor = 'rgb(251 191 36)'
              break
            case 'rejected':
              backgroundColor = 'rgb(248 113 113)'
              break
            default:
              backgroundColor = 'lightgrey'
              break
          }

          return (
            <div
              key={id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div className="flex">
                <h2
                  className={`bg-${backgroundColor} rounded-md p-1 `}
                  style={{ backgroundColor: backgroundColor }}
                >
                  {column.name}
                </h2>
                <h2 className="self-center ml-2">{column.items.length}</h2>
              </div>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? 'none' : 'none',
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      borderRadius: 10,
                                      backgroundColor: snapshot.isDragging
                                        ? 'rgb(2 132 199)'
                                        : 'rgb(14 165 233)',
                                      color: 'white',

                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <div>
                                      <div>{item.title}</div>
                                      <div>{item.description}</div>
                                      <div>{item.contactInformation}</div>
                                    </div>
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
}

export default DragAndDrop
