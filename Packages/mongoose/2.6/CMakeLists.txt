cmake_minimum_required(VERSION 3.10)
project(mongoose VERSION 2.6 LANGUAGES C)

include(GNUInstallDirs)

set(mongoose_HEADERS
  mongoose.h
  )

set(mongoose_SOURCES
  mongoose.c
  )

set(mongoose_INCLUDES
  "${CMAKE_CURRENT_BINARY_DIR}"
  "${CMAKE_CURRENT_SOURCE_DIR}"
  )

source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES ${mongoose_HEADERS} ${mongoose_SOURCES})

add_library(libmongoose OBJECT ${mongoose_HEADERS} ${mongoose_SOURCES})
target_include_directories(libmongoose PUBLIC "$<BUILD_INTERFACE:${mongoose_INCLUDES}>")
set_target_properties(libmongoose PROPERTIES PUBLIC_HEADER ${mongoose_HEADERS})
set_target_properties(libmongoose PROPERTIES POSITION_INDEPENDENT_CODE ON)
set(_INSTALL_TARGETS libmongoose)

add_library(mongoose_static STATIC $<TARGET_OBJECTS:libmongoose>)
set_target_properties(mongoose_static PROPERTIES OUTPUT_NAME mongoose)
list(APPEND _INSTALL_TARGETS mongoose_static)

add_library(mongoose_shared SHARED $<TARGET_OBJECTS:libmongoose>)
set_target_properties(mongoose_shared PROPERTIES VERSION ${PROJECT_VERSION} SOVERSION ${PROJECT_VERSION_MAJOR})
set_target_properties(mongoose_shared PROPERTIES OUTPUT_NAME mongoose)
list(APPEND _INSTALL_TARGETS mongoose_shared)

if (TARGET mongoose_static)
  add_library(Mongoose::Mongoose ALIAS mongoose_static)
else ()
  add_library(Mongoose::Mongoose ALIAS mongoose_shared)
endif ()

source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES main.c)
add_executable(mongoose main.c)
target_link_libraries(mongoose PRIVATE Mongoose::Mongoose)
list(APPEND _INSTALL_TARGETS mongoose)

install(TARGETS ${_INSTALL_TARGETS}
  RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}"
  LIBRARY DESTINATION "${CMAKE_INSTALL_LIBDIR}"
  ARCHIVE DESTINATION "${CMAKE_INSTALL_LIBDIR}"
  PUBLIC_HEADER DESTINATION "${CMAKE_INSTALL_INCLUDEDIR}"
  )
